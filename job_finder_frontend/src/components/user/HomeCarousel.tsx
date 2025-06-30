import Carousel from "react-material-ui-carousel";
import HomeCarouselItem from "./HomeCarouselItem";

import Image from "../../assets/Rectangle 106.svg";
type CarouselItem = {
  image: string;
};

export default function HomeCarousel() {
  var item: CarouselItem = {
    image: Image,
  };

  return (
    <Carousel autoPlay={false} animation="slide">
      <HomeCarouselItem item={item} />
    </Carousel>
  );
}
