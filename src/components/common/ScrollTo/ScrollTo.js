import styles from './ScrollTo.module.scss';

function ScrollTo({showButton,scrollToTop}) {

    return(
        showButton &&
        <div className={styles.scrollBtn}>
            <button className={styles.btn} onClick={scrollToTop}>^</button>
        </div>  
    );
}

export default ScrollTo;