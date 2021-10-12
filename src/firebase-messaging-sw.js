import { initializeApp } from 'firebase/app'
import { getMessaging, isSupported, onBackgroundMessage } from 'firebase/messaging/sw'
import firebaseConfig from './firebase.json'

self.addEventListener('install', (event) => {
    self.skipWaiting()
})

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim())
})

self.addEventListener('notificationclick', (event) => {
    console.log('== on notification click event ==')
    // Event logged here will either have empty data or FCM_MSG fro the same call
    // event.notification.data.FCM_MSG.data
    console.log(event)
})

self.addEventListener('push', () => {})
self.addEventListener('pushsubscriptionchange', () => {})

const app = initializeApp(firebaseConfig)

isSupported()
    .then(() => {
        const messaging = getMessaging(app)

        onBackgroundMessage(messaging, ({ notification }) => {
            const { title, body, image } = notification ?? {}

            if (!title) {
                return
            }

            self.registration.showNotification(title, {
                body,
                icon: image,
            })
        })
    })
    .catch((error) => {
        console.error(error)
    })

// self.__WB_MANIFEST
