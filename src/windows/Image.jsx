import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const ImageFile = () => {
  const { windows } = useWindowStore();
  const data = windows?.imgfile?.data;

  if (!data) return null;

  const src = data.imageUrl || data.image || data.src || data.img;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{data.name}</h2>
      </div>
      <div className="image-file-content p-6 h-full flex items-center justify-center">
        {src ? (
          <img
            src={src}
            alt={data.name}
            className="max-h-full max-w-full rounded-xl shadow-xl"
          />
        ) : (
          <p className="text-gray-600">No image available.</p>
        )}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(ImageFile, "imgfile");

export default ImageWindow;
