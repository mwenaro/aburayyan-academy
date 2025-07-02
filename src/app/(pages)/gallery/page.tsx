import { GalleryComponent } from "./Gallery";

const tepImages = [];
for (let num = 1; num <= 10; num++) {
  tepImages.push({
    src: `/school/students/grads/grad-${num}.JPG`,
    description: "",
    category: "PP2 Graduation 2024",
  });
}
const images = [
  {
    src: "/school/teachers/abu-rayyan-teachers-2024-ladies-sitting.JPG",
    description: "Meet Abu-Rayyan Academy Teachers",
    category: "Teachers",
  },
  {
    src: "/school/teachers/abu-rayyan-teachers-2024-male-sitting.JPG",
    description: "Meet Abu-Rayyan Academy Teachers",
    category: "Teachers",
  },
  {
    src: "/school/teachers/abu-rayyan-teachers-2024.JPG",
    description: "Meet Abu-Rayyan Academy Teachers",
    category: "Teachers",
  },
...tepImages
  // Add more images
];

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Gallery</h1>
      <GalleryComponent images={images} />
    </div>
  );
}
