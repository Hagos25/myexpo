import { call, put, takeLatest,take} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { db} from '../firebase'
import { 
    collection, addDoc, serverTimestamp, getDocs, query, orderBy ,onSnapshot} from "firebase/firestore";
import { 
    fetchMessagesRequest, fetchMessagesSuccess, fetchMessagesFailure, 
    sendMessageRequest, sendMessageSuccess, sendMessageFailure 
} from '../slices/ChatSlice'


// Fetch chat messages from Firestore
function createFirestoreChannel() {
    return eventChannel((emit) => {
        console.log("Listening to Firestore changes...");

        try {
            // Ensure Firestore query is valid
            const q = query(collection(db, "messages"), orderBy("createdAt"));

            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    console.log("Updated messages:", messages);
                    emit({ messages }); 
                },
                (error) => {
                    console.error("Firestore listener error:", error);
                    emit({ error: error.message }); 
                }
            );

            return () => unsubscribe(); 
        } catch (error) {
            console.error("Error creating Firestore channel:", error);
            emit({ error: error.message });
        }
    });
}

// Saga to listen for Firestore messages in real-time
function* fetchMessages() {
    const channel = yield call(createFirestoreChannel);

    try {
        while (true) {
            const data = yield take(channel);

            if (data.error) {
                console.error("Error fetching messages:", data.error);
                yield put(fetchMessagesFailure(data.error)); // Correct error handling
            } else {
                console.log("Dispatching messages:", data.messages);
                yield put(fetchMessagesSuccess(data.messages));
            }
        }
    } catch (error) {
        console.error("Saga listener error:", error);
        yield put(fetchMessagesFailure(error.message)); // Send failure action
    }
}





// Send a message to Firestore
function* sendMessage(action) {
    try {
        const { message, senderId } = action.payload;
        console.log("Sending message:", message);

        yield call(addDoc, collection(db, "messages"), {
            text: message,
            senderId: senderId,
            createdAt: serverTimestamp(),
        });

        console.log("Message saved in Firestore (Real-Time)");

        yield put(sendMessageSuccess());
    } catch (error) {
        console.error("Message send failed:", error.message);
        yield put(sendMessageFailure(error.message));
    }
}

export function* chatSaga() {
    yield takeLatest(fetchMessagesRequest.type, fetchMessages);
    yield takeLatest(sendMessageRequest.type, sendMessage);
}