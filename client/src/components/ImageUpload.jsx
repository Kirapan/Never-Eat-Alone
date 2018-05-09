
// import React, { Component } from 'react'
// //import { read } from 'fs';

// class ImageUpload extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       file: '',
//       imagePreviewUrl: ''
//     };
//     this._handleImageChange = this._handleImageChange.bind(this);
//     this._handleSubmit = this._handleSubmit.bind(this);
//   }

//   _handleSubmit(e) {
//     e.preventDefault();
//     this.props.imageSubmit(e, this.state.imagePreviewUrl)
//   }

//   _handleImageChange(e) {
//     e.preventDefault();

//     let reader = new FileReader();
//     let file = e.target.files[0];

//     reader.onloadend = (evt) => {
//       //localStorage.setItem("img", reader.result)
//       this.setState({
//         file: file,
//         imagePreviewUrl: reader.result
//       });
//     }

//     reader.readAsDataURL(file)
//   }

//   render() {
//     let { imagePreviewUrl } = this.state;
//     //imagePreviewUrl = localStorage.getItem("img")
//     let $imagePreview = null;
//     if (imagePreviewUrl) {
//       $imagePreview = (<img src={imagePreviewUrl} alt=''/>);
//     }

//     return (
//       <div>
//         <form >
//           <input type="file" onChange={this._handleImageChange} />
//           <button type="submit" onSubmit={this._handleSubmit}>Upload Image</button>
//         </form>
//         {$imagePreview}
//       </div>
//     )
//   }

// }

// export default ImageUpload