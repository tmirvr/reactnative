import React from "react"
import { Card } from "../../components/blog/Card"
import { Category } from "../../components/category/Category"

export default function Home() {
  return (
    <>
      {/*  <Slider />*/}
      <Category />
      <Card />
    </>
  )
}
