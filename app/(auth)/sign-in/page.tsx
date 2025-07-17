import AuthForm from '@/components/AuthForm'
import React from 'react'

type Props = {}

function page({}: Props) {
  return (
    <AuthForm type='sign-in' />
  )
}

export default page