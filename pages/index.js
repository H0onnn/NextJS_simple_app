import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>NextJS Meetups App</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

// getServerSideProps 함수는 요청마다 호출되는 SSR 데이터 패칭 함수이다. 각 페이지 요청마다 실행된다.
// context 객체는 요청에 대한 정보를 담고 있는 객체로 params, req, res, query 등의 속성을 가진다.
// 사용자마다 다른 데이터를 제공해야 하는 경우나, 항상 최신의 데이터를 제공해야 하는 경우 유용하다.
// 하지만 미리 페이지를 생성할 수 없으므로, 페이지 로딩 속도가 느릴 수 있기에 가능한 StaticProps를 사용하는게 좋다.

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://hoonnn:asdfqwer1234@cluster0.dxukbe4.mongodb.net/meetups"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // 정적 페이지가 재생성되는 시간 설정 (10초) 10초가 지나면 다음 요청에서는 최신 데이터를 가진 새로운 페이지를 생성한다.
  };
}

export default HomePage;
