import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

// getStaticPaths 함수는 SSR 렌더링 기능 중 정적 생성을 이용할 때 사용한다. 정적 생성이란 빌드 시 html 파일을 미리 생성하는 방식을 말하며, 생성된 페이지는 요청시 마다 재사용 된다.
// 이 함수는 동적 라우팅을 사용하는 페이지에서 필요로 하는데, 빌드 시에 렌더링해야 하는 경로 목록을 정의할 수 있다.
// [meetupId] 형식의 동적 라우트를 정의 했기 때문에, [meetupId] 부분에 들어갈 수 있는 값을 반환해야 한다.
// 아래 하드코딩된 예제 에서는 id 값인 'm1', 'm2'에 대한 경로를 생성한다. fallback: false 속성은 빌드 시 생성되지 않은 경로에 접근할 경우 404 에러를 반환한다.

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://hoonnn:asdfqwer1234@cluster0.dxukbe4.mongodb.net/meetups"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // _id는 1개만 포함하고 나머지 필드는 가져오지 않겠다는 의미

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://hoonnn:asdfqwer1234@cluster0.dxukbe4.mongodb.net/meetups"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
