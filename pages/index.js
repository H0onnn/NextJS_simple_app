import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://a.cdn-hotels.com/gdcs/production107/d1849/225504a0-f586-11e8-a5a3-0242ac110006.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    address: "Some address 5, 1234 Some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://a.cdn-hotels.com/gdcs/production107/d1849/225504a0-f586-11e8-a5a3-0242ac110006.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    address: "Some address 6, 1234 Some City",
    description: "This is a second meetup!",
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}
export async function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10, // 정적 페이지가 재생성되는 시간 설정 (10초) 10초가 지나면 다음 요청에서는 최신 데이터를 가진 새로운 페이지를 생성한다.
  };
}

export default HomePage;
