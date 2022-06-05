const Featured = () => {
  return (
    <section className="featured">
      <div className="container">
        <article style={{ backgroundImage: 'url(/images/featured-1.jpg)' }} className="featured-item featured-item-large">
          <div className="featured-item__content">
            <h3>New arrivals are now in!</h3>
            <a href="#" className="btn btn--rounded">Show Collection</a>
          </div>
        </article>

        <article style={{ backgroundImage: 'url(/images/featured-2.jpg)' }} className="featured-item featured-item-small-first">
          <div className="featured-item__content">
            <h3>Basic t-shirts $29,99</h3>
            <a href="#" className="btn btn--rounded">More details</a>
          </div>
        </article>

        <article style={{ backgroundImage: 'url(/images/featured-3.jpg)' }} className="featured-item featured-item-small">
          <div className="featured-item__content">
            <h3>Sale this summer</h3>
            <a href="#" className="btn btn--rounded">VIEW ALL</a>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Featured;
