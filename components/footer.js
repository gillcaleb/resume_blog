import Container from './container'
import Themechanger from '../components/themechanger'
import React, { useEffect, useState } from "react";



export default function Footer() {
  return (
    <footer className="border-t border-accent-2">  {/* bg-accent-1 overrides the default dark mode aspect - find a way to fix it*/}
      <Container>
        <div className="py-6 flex flex-col lg:flex-row items-center">

          <h3 className="text-sm lg:text-sm font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
              &copy; caleb gill. all rights reserved.
          </h3>
          <Themechanger></Themechanger>
        </div>
      </Container>
    </footer>
  )
}
