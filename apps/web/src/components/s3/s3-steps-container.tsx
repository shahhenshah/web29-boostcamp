'use client'

import S3BucketCreate from './s3-bucket-create'
import S3BucketDetail from './s3-bucket-detail'
import S3BucketList from './s3-bucket-list'
import S3FileUpload from './s3-file-upload'

import React from 'react'

import { StepsNavigator } from '@/components/steps-navigator'

const S3_STEPS = [
  {
    id: 'create',
    title: '버킷 생성',
    description: '새 버킷 만들기',
    component: <S3BucketCreate />,
  },
  {
    id: 'list',
    title: '버킷 목록',
    description: '버킷 조회',
    component: <S3BucketList />,
  },
  {
    id: 'detail',
    title: '버킷 상세',
    description: '객체 관리',
    component: <S3BucketDetail />,
  },
  {
    id: 'upload',
    title: '파일 업로드',
    description: '객체 업로드',
    component: <S3FileUpload />,
  },
]

export default function S3StepsContainer() {
  return (
    <div className="min-h-screen">
      <StepsNavigator steps={S3_STEPS} defaultStep={1} className="p-6" />
    </div>
  )
}
