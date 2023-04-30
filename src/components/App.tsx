import {AppRouter} from "./AppRouter";
import Navigation from "./Navigation";
import React, {useContext } from "react";
import {AuthContext} from "../context";
import { DynamicForm, Field } from "../utils/DynamicForm";
import axiosClient from "../utils/axiosClient";



function App() {
  const {isAuth, isLoading} = useContext(AuthContext)
  // const fields: Field[] = [
  //   {
  //     name: "email",
  //     label: "Email",
  //     type: "email",
  //     placeholder: "email",
  //     required: true,
  //   },
  //   {
  //     name: "password",
  //     label: "password",
  //     type: "password",
  //     placeholder: "password",
  //     required: true,
  //   },
  //   {
  //     name: "password_confirmation",
  //     label: "Confirm Password",
  //     type: "text",
  //     placeholder: "password",
  //     required: true,
  //   },
  //   {
  //     name: "fruct",
  //     label: "Select",
  //     type: "select",
  //     placeholder: "select",
  //     required: true,
  //     options: [
  //       { value: 'apple', label: 'Apple' },
  //       { value: 'banana', label: 'Banana' },
  //       { value: 'orange', label: 'Orange' },
  //       { value: 'grape', label: 'Grape' }
  //     ]
  //   },
  // ];

  // interface UserReg {
  //   email: string;
  //   password: string;
  //   role: string;
  // }

  // const createUser = (values: UserReg) => {
  //   console.log(values);
    
  //   // try {
  //   //   axiosClient.post("register", values)
  //   // } catch (error) {
  //   //   console.error(error);
            
  //   // }
  // }
  return (
    <>
      {
        isAuth && !isLoading && <Navigation/>
      }
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: 'auto',
          width: '100%',
        }}
        >
        <AppRouter />
      </div>
      {/* <DynamicForm fields={fields} onSubmit={(v) => createUser(v)} open={true} handleClose={function (): void {
        throw new Error("Function not implemented.");
      } } service={undefined}/> */}
    </>
  )
}

export default App
