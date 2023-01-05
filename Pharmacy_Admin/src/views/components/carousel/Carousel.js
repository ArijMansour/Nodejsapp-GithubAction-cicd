import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src="https://images.prismic.io/adahealth/d2def83d-5ef2-4268-a000-0d8994d50747_partner_logo-novartis.png?auto=format&ch=Save-Data&fit=clip&h=100&dpr=1&q=55"  onDragStart={handleDragStart} />,
  <img src="https://images.prismic.io/adahealth/35c40ff1-e398-4258-a3a9-df8d33acbc69_partner_logo-takeda.png?auto=format&ch=Save-Data&fit=clip&h=100&dpr=1&q=55" onDragStart={handleDragStart} />,
  <img src="https://images.prismic.io/adahealth/dd412f06-f66c-470b-9126-dac4eb4e2639_partner_logo-sutter-health.png?auto=format&ch=Save-Data&fit=clip&h=100&dpr=1&q=55" onDragStart={handleDragStart} />,
  <img src="  https://images.prismic.io/adahealth/8a7a6d43-b866-4332-9f03-f12699282165_partner_logo-botnar.png?auto=format&ch=Save-Data&fit=clip&h=100&dpr=1&q=55
  " onDragStart={handleDragStart} />,
<img src="  https://images.prismic.io/adahealth/8dd61aa2-7bd9-4396-82c0-d53b252bbd0b_partner_logo-labor-berlin.png?auto=format&ch=Save-Data&fit=clip&h=100&dpr=1&q=55

  " onDragStart={handleDragStart} />,


];
const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
    1024: { items: 4 },
};
const Carousel = () => {
  return (
<AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
    />  );
}

export default Carousel;
