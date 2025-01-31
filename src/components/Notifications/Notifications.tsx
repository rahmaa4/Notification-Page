import styles from "./Notifications.module.scss";
import Banner from "../Banner/Banner";
import Notification from "../Notification/Notification";
import { useEffect, useState } from "react";

export default function Notifications() {
    const [notifications, setNotifications] = useState<Record<string, any>[] | null>(null);//set Notifications data
    const [notifCount, setNotifCount] = useState<number | null>(null); //track Notification count
    const [isAllRead, setIsAllRead] = useState(false); //track isAllRead
    
    const getNotifications = async () => {
        try {
        const resp = await fetch("./data.json");
        if (resp.ok) {
            const notificationsArr = await resp.json();
            return notificationsArr.notifications;
            }
        }
        catch (e) {
            console.log(e);
        }
    }//api function

    useEffect(() => {
        const handleGetNotifications = async () => {
            const resp = await getNotifications();
            setNotifications(resp.reverse());
        }
        handleGetNotifications();
    }, []) //make api request, when component mounts, to grab data.

    useEffect(() => {
        if (notifications && notifications.length !== 0) {
            const countIsNotRead = notifications.filter((el) => el.isRead !== true).length;
            setNotifCount(countIsNotRead);
        }
    }, [notifications]) //grab the elements that are not read, initially.

    useEffect(() => {
        setNotifCount(0);
    }, [isAllRead])//set the notification count to 0, when isAllRead.



    return (
        <div className={styles.wrapper}>
            <Banner notifCount={notifCount} isAllRead={isAllRead} setIsAllRead={setIsAllRead} />
            <div className={styles.notificationsWrapper}>
                {
                    notifications && notifications.map((el, index) => {
                        return <Notification
                            key={index}
                            username={el.name}
                            profileImg={el.profileImage}
                            action={el.action}
                            feature={el.feature}
                            timeSince={el.timeSince}
                            imagePost={el.imagePost}
                            isRead={el.isRead}
                            isAllRead={isAllRead}
                                />
                    })
                }
            </div>
        </div>
    )
};