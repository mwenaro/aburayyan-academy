"use client";
import React from "react";
import { Button } from "../button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button variant={"destructive"} onClick={()=>signOut()}>
      Logout
    </Button>
  );
}
