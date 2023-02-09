import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import PhoneInput from 'react-phone-input-2'
import axios from "axios"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { SimpleFooter } from "@/widgets/layout";
import React, { Component } from 'react'
import  "./Sinup.css"
import 'react-phone-input-2/lib/style.css'
 export class SignUp extends Component {
  constructor(){
    super()
    this.state={
      username:"",
      email:"",
      phone_number:"",
      password:"",
      imageselected: [],

    }
  }
  async adduser(e) {

    console.log(this.state.imageselected)

    const{username,email,phone_number,password,imageselected}=this.state
    e.preventDefault();
    // if (this.handleValidation()) {
      const formData = new FormData()
      formData.append("file", imageselected)
      formData.append('upload_preset', 'kgiezron')
      await axios.post('http://api.cloudinary.com/v1_1/dm1xlu8ce/upload', formData).then((res) => {
     
      axios.post('http://localhost:5555/api/Create/newuser',{
        username:username,
        email:email,
        phone_number:phone_number,
       password:password,
       photo:res.data.url,
      }).then((res) => {
        console.log(res)
      })
     
  })
  // } else {
  //   alert("Form has errors.")
  // }
  
  }
  handleChange(e){ 
     
    this.setState({[e.target.name]:e.target.value})
    
    console.log(
      {[e.target.name]:e.target.value}
    )
  }
  render() {
    const {phone_number}= this.state
    return (
      <>
      {console.log(this.state)}
        <img
          src="/img/background-2.jpg"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
        <div className="container mx-auto p-4">
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign Up
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input variant="standard" label="User_Name" size="lg" onChange={(e)=>this.handleChange(e)} name="username"/>
              <Input variant="standard" type="email" label="Email" size="lg" onChange={(e)=>this.handleChange(e)} name="email"/>
              <Input
                variant="standard"
                type="password"
                label="Password"
                size="lg"
                onChange={(e)=>this.handleChange(e)}
                name="password"
              />
               <PhoneInput
              
            placeholder="Enter phone number"
            country={'tn'}
            value={phone_number}
            onChange={ phone_number  => this.setState({phone_number })}
         /> 
                 <input type="file" accept="image/*,.mp4" name="image-upload" id="input" onChange={(event) => this.setState({ imageselected: event.target.files[0] })} />
                      <div className="label">
                        <label className="image-upload" htmlFor="input">
                        <AddAPhotoIcon />
						Choose your Photo
					</label>
          </div>
           
              <div className="-ml-2.5">
                <Checkbox label="I agree the Terms and Conditions" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth onClick={(e)=>this.adduser(e)}>
                Sign Up
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Already have an account?
                <Link to="/sign-in">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign in
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </div>
        <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
          <SimpleFooter />
        </div>
      </>
    );
  }
}
export default SignUp
