import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import moment from 'moment';

const KEY = 'myNotificationKey';

export const removeExistingNotification = () =>
    AsyncStorage
        .removeItem(KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync);

export const setNotification = () =>
    AsyncStorage.getItem(KEY)
        .then(toJson)
        .then((json) => {
            if (!json) {
                return;
            }

            Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status }) => {
                    if (status !== 'granted') {
                        console.log('user did not consent');
                        return;
                    }

                    Notifications.cancelAllScheduledNotificationsAsync();
                    Notifications.scheduleLocalNotificationAsync(
                        getNotificationMessage(),
                        getScheduleOptions(),
                    );

                    AsyncStorage.setItem(KEY, JSON.stringify(true));
                });
        });

const getNotificationMessage = () => ({
    title: 'Quizzle!',
    body: 'Remember to do your daily quiz!',
    ios: {
        sound: true
    },
    android: {
        sound: true
    }
});

const getScheduleOptions = () => ({
    time: getDateTomorrow(),
    repeat: 'day'
});

const toJson = (serializedJson) => JSON.parse(serializedJson);

const getDateTomorrow = () =>  moment().add(1, 'minutes')//.hour(20).minute(0);