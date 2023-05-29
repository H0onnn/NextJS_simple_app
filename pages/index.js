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
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10, // 정적 페이지가 재생성되는 시간 설정 (10초) 10초가 지나면 다음 요청에서는 최신 데이터를 가진 새로운 페이지를 생성한다.
  };
}

export default HomePage;
