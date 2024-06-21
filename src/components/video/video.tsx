export function Video(): JSX.Element {
  return (
    <section className="section section--video">
      <div className="section__wrapper section__wrapper--video">
        <div className="video">
          <video className="video__player" controls={false} autoPlay playsInline muted loop>
            <source src="https://bluebeard.qodeinteractive.com/wp-content/uploads/2023/01/main-home-video-1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
