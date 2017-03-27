<template>
	<div class="hexagon-wrapper">
	    <div class="hexagon"></div>
	</div>
</template>


<style lang="sass">
.hexagon-wrapper {
  text-align: center;
  margin: 5px;
  transform: rotate(30deg);
  position: relative;
  display: inline-block;
}

.hexagon {
  height: 100%;
  width: calc(100% * 0.57735);
  display: inline-block;
}

.hexagon:before {
  position: absolute;
  top: 0;
  right: calc((100% / 2) - ((100% * 0.57735) / 2));
  background-color: inherit;
  height: inherit;
  width: inherit;
  content: '';
  transform: rotateZ(60deg);
}

.hexagon:after {
  position: absolute;
  top: 0;
  right: calc((100% / 2) - ((100% * 0.57735) / 2));
  background-color: inherit;
  height: inherit;
  width: inherit;
  content: '';
  transform: rotateZ(-60deg);
}
</style>