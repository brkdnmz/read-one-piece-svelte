<script lang="ts">
  import LogoRightPart from "$lib/assets/one-piece-logo.webp";
  import LogoLeftPart from "$lib/assets/read-one-piece-font.png";

  const SIZE = 40;
</script>

<div class="flex items-center justify-center py-2">
  <img
    src={LogoLeftPart}
    style:height={`${SIZE * 0.8}px`}
    style:margin-top={`${-SIZE / 48}px`}
    alt="Logo left part"
  />
  <img src={LogoRightPart} style:height={`${SIZE}px`} alt="Logo right part" />
</div>
