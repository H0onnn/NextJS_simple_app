import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://a.cdn-hotels.com/gdcs/production107/d1849/225504a0-f586-11e8-a5a3-0242ac110006.jpg?impolicy=fcrop&w=1600&h=1066&q=medium"
      title="First Meetup"
      address="Some Street 5, Some City"
      description="This is a first meetup"
    />
  );
}

// getStaticPaths 함수는 SSR 렌더링 기능 중 정적 생성을 이용할 때 사용한다. 정적 생성이란 빌드 시 html 파일을 미리 생성하는 방식을 말하며, 생성된 페이지는 요청시 마다 재사용 된다.
// 이 함수는 동적 라우팅을 사용하는 페이지에서 필요로 하는데, 빌드 시에 렌더링해야 하는 경로 목록을 정의할 수 있다.
// [meetupId] 형식의 동적 라우트를 정의 했기 때문에, [meetupId] 부분에 들어갈 수 있는 값을 반환해야 한다.
// 아래 하드코딩된 예제 에서는 id 값인 'm1', 'm2'에 대한 경로를 생성한다. fallback: false 속성은 빌드 시 생성되지 않은 경로에 접근할 경우 404 에러를 반환한다.

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  console.log(meetupId);

  return {
    props: {
      meetupData: {
        image:
          "https://a.cdn-hotels.com/gdcs/production107/d1849/225504a0-f586-11e8-a5a3-0242ac110006.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        id: meetupId,
        title: "First Meetup",
        address: "Some Street 5, Some City",
        description: "This is a first meetup",
      },
    },
  };
}

export default MeetupDetails;
