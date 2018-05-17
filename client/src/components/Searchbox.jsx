<SearchBox
      ref={this.handleSearchBoxMounted}
      bounds={this.state.bounds}
      onPlacesChanged={this.handlePlacesChanged.bind(this)}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
    >
      <input
        type="text"
        placeholder="Please enter"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`
        }}
      />
    </SearchBox>


    <Carousel.Item>
          <img alt="BUSINESS_LUNCH_1" src={Image1} />
          <Carousel.Caption>
            <h1>Are you tired of eating lunch alone?</h1>
            <h3>50% of business professionals eat their lunch alone.</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img alt="BUSINESS_LUNCH_2" src={Image2} />
          <Carousel.Caption>
            <h1>We have the solution!</h1>
            <h3>Find a business professional that can give you valuable advice.</h3>
          </Carousel.Caption>
        </Carousel.Item>