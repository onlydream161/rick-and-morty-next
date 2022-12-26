import { FC } from 'react'
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import { FileModel } from '@/shared/@types'
import 'swiper/css'
import { NextImage } from '../next-image'
import { A11y, Keyboard } from 'swiper'

export interface CarouselProps extends SwiperProps {
  //TODO: Скорее всего здесь будет вся модель машины, так что можно для alt у картинки взять name + id
  images: FileModel[]
  slideWidth: number
  slideHeight: number
  slideBorderRadius: number
}

export const Carousel: FC<CarouselProps> = ({ images, slideWidth, slideHeight, slideBorderRadius, ...rest }) => (
  <Swiper modules={[A11y, Keyboard]} grabCursor loop freeMode slidesPerView='auto' {...rest}>
    {images.map(image => (
      <SwiperSlide key={image.id} style={{ width: slideWidth, height: slideHeight }}>
        <NextImage src={image.path} style={{ borderRadius: slideBorderRadius }} />
      </SwiperSlide>
    ))}
  </Swiper>
)
