import { useEffect } from "react";
import styles from "../Notifications/Notifications.module.scss";

type BannerProp = {
    notifCount: number | null,
    isAllRead: boolean,
    setIsAllRead: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Banner({notifCount, isAllRead, setIsAllRead}: BannerProp) {
    
    const handleClick = () => {
        setIsAllRead((prev) => !prev);
    } //handle click function on "Mark all is read" button.

    useEffect(() => {
        if (isAllRead) {
            document.getElementById("mark-all-read-btn")!.style.visibility = "hidden";
        }
    }, [isAllRead]) //hide "mark all as read" button when isAllRead is true.
    
    
    return (
        <div className={styles.bannerWrapper}>
            <div className={styles.titleWrapper}>
                <p className={styles.title}>Notifications</p>
                <div className={styles.countWrapper}>
                    <span className={styles.count}>{notifCount}</span>
                </div>
            </div>
            <button id="mark-all-read-btn" onClick={handleClick}>Mark all as read</button>
        </div>
    )
}