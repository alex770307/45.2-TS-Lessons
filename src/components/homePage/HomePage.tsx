
import styles from './homePage.module.css'
import HomePageLessons from '../homePageLessons/HomePageLessons';


export default function HomePage():JSX.Element {
  return (
    <>
      <h2>alexs home page🏠</h2>
      <div className={styles.gridContainer}>
        <HomePageLessons />
       
        {/* <Link to="lesson-01">
          <div>Lesson 1</div>
        </Link> */}
      </div>
    </>
  );
}

