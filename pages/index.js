import Link from "next/link";

export default function HomeScreen() {
  return (
    <div>
      <h1>Página Inicial</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit
        amet sodales eros, ut iaculis lectus. Nullam varius eget quam eget
        tempor. Ut nec lectus pellentesque, mollis arcu viverra, elementum
        sapien. Sed mollis sapien sit amet pellentesque rhoncus. Vestibulum
        ultricies diam ac justo hendrerit ornare. Pellentesque blandit leo vel
        hendrerit suscipit. Donec vitae risus volutpat, malesuada nisi ac,
        finibus leo. Maecenas vitae sem semper, interdum neque et, tincidunt
        quam. Sed ultricies orci quis vehicula commodo. Cras nisi dolor, dictum
        sit amet vulputate at, pharetra et tortor. Cras sed vestibulum dui.
        Vestibulum eu orci in urna laoreet feugiat at a felis. Proin vitae
        pulvinar nulla. Nulla bibendum purus sodales sapien vulputate dignissim.
        Duis dignissim magna velit.
      </p>
      <Link href="/sobre">Sobre</Link>
    </div>
  );
}
