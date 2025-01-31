import { useEffect } from "react";
import styles from "../Notifications/Notifications.module.scss";

type NotificationProp = {
    username: string,
    profileImg: string,
    action: string,
    feature:string, 
    timeSince: string, 
    imagePost: string | null,
    isRead: boolean,
    isAllRead: boolean
}

export default function Notification({
    username,
    profileImg,
    action,
    feature,
    timeSince,
    imagePost,
    isRead,
    isAllRead
}: NotificationProp)
{

    useEffect(() => {
        const actions = Array.from(document.getElementsByClassName(`${styles.action}`)) as HTMLElement[];
        if (actions) {
            actions.forEach((el) => {
                const feature = el.nextElementSibling as HTMLElement;
                if (el.innerHTML.includes("left the group") || el.innerHTML.includes("joined your group")) {
                    feature.style.color = "hsl(219, 85%, 26%)";
                }
                })
        }
    }, []) //check if action includes "group" content , which for this simple page, would mean that the feature is "chess club".
    //and then turn that text to blue. 


    return (
        <div className={`${styles.notificationWrapper} ${isRead? null: styles.isNotRead } ${isAllRead? styles.isAllRead : null}`}>
            <div className={styles.notificationCont}>
                <img src={profileImg} alt="profile Image" />
                <div className={styles.notificationData}>
                    <div className={styles.notifFlexContainer}>
                        <div className={styles.notificationText}>
                            <div className={styles.top}>
                                <a className={styles.username} href="">{username}</a>
                                <span className={styles.action}>{action}</span>
                                {feature && action.includes("sent you a private message") ?  null : <a className={styles.feature} href="">{feature}</a> }
                                {!isRead && <div className={styles.redCircle}></div>}
                            </div>
                            <p className={styles.timeSince}>{timeSince && timeSince}</p>
                        </div>
                        {imagePost &&
                            <div className={styles.ntImgWrapper}>
                                <img src={imagePost} alt=""/>
                            </div>
                            }
                    </div>
                    {feature && action.includes("sent you a private message") ? <a className={`${styles.feature} ${styles.message}`} href="">{feature}</a>: null}
                </div>
            </div>
        </div>
    )
}