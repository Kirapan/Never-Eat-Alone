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