import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Carousel.module.css';

function Carousel({ cardWidth, visibleCardsNumber, children }) {
  const [position, setPosition] = useState(0);

  const [visibleNumber, setVisibleCardsNumber] = useState(
    window.outerWidth <= 901 ? 2 : visibleCardsNumber,
  );

  useEffect(() => {
    const onResize = () => setVisibleCardsNumber(window.outerWidth <= 901 ? 2 : visibleCardsNumber);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  return (
    <div className={style.carousel}>
      <button
        className={style.moveBtnPrev}
        onClick={() => setPosition(Math.min(position + cardWidth * visibleNumber, 0))}
        type="button"
      >
        <img src="/img/prev.png" alt="Prev" />
      </button>
      <div className={style.wrapper} style={{ maxWidth: `${cardWidth * visibleNumber}px` }}>
        <div className={style.lane} style={{ transform: `translateX(${position}px)` }}>
          {children}
        </div>
      </div>
      <button
        className={style.moveBtnNext}
        onClick={() => setPosition(
          Math.max(
            position - cardWidth * visibleNumber,
            -cardWidth * (children.length - visibleNumber),
          ),
        )}
        type="button"
      >
        <img src="/img/next.png" alt="Next" />
      </button>
    </div>
  );
}

Carousel.propTypes = {
  cardWidth: PropTypes.number.isRequired,
  visibleCardsNumber: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Carousel;
