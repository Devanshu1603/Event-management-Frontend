import React from 'react'
import './Preloader.css';

const Preloader = () => {
  return (
    <div className='preloader-container'>
      <div class="hexagon" aria-label="Animated hexagonal ripples">
	<div class="hexagon__group">
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
	</div>
	<div class="hexagon__group">
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
	</div>
	<div class="hexagon__group">
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
	</div>
	<div class="hexagon__group">
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
	</div>
	<div class="hexagon__group">
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
	</div>
	<div class="hexagon__group">
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
		<div class="hexagon__sector"></div>
	</div>
</div>
<p aria-label="Loading" className='gradient-text'>Loading</p>
    </div>
  )
}

export default Preloader
