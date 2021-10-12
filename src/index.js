import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, isSupported } from 'firebase/messaging'
import firebaseConfig from './firebase.json'

const tokenEl = document.querySelector('#token')

async function registerServiceWorker(url) {
    if ('serviceWorker' in navigator) {
        return navigator.serviceWorker.register(url)
    }
    throw new Error('Service worker not supported.')
}

async function initNotification() {
    const app = initializeApp(firebaseConfig)

    if (await isSupported()) {
        try {
            const messaging = getMessaging(app)
            const registration = await registerServiceWorker('./firebase-messaging-sw.js')

            tokenEl.innerHTML = await getToken(messaging, { serviceWorkerRegistration: registration })
        } catch (error) {
            console.error(error)
        }
    }
}

window.addEventListener('load', function() {
    initNotification()
})
