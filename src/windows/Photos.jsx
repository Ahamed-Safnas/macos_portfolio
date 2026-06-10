import { useState } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";
import { photosLinks, gallery } from "#constants";

const Photos = () => {
  const { openWindow } = useWindowStore();
  const [activeCategory, setActiveCategory] = useState(photosLinks[0]?.id ?? null);

  const selectedCategory = photosLinks.find((link) => link.id === activeCategory);
  const filteredGallery = gallery.filter((item) => {
    if (!selectedCategory) return true;
    if (selectedCategory.category === "favorites") return item.favorite;
    return item.category === selectedCategory.category;
  });

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2>Photos</h2>
      </div>

      <div className="flex h-full">
        <aside className="sidebar">
          <h2>Collections</h2>
          <ul className="space-y-2">
            {photosLinks.map((link) => (
              <li
                key={link.id}
                className={`transition-colors rounded-md ${
                  link.id === activeCategory
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(link.id)}
              >
                <div className="flex items-center gap-2 px-3 py-2 cursor-pointer">
                  <img src={link.icon} alt={link.title} className="w-4" />
                  <p className="text-sm font-medium">{link.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <section className="gallery flex-1 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-semibold">{selectedCategory?.title || "Gallery"}</h3>
              <p className="text-xs text-gray-500">
                {filteredGallery.length} photos in {selectedCategory?.title || "all collections"}
              </p>
            </div>
          </div>

          {filteredGallery.length ? (
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {filteredGallery.map((item) => (
                <li
                  key={item.id}
                  className="overflow-hidden rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                  onClick={() =>
                    openWindow("imgfile", {
                      ...item,
                      name: item.title || `Photo ${item.id}`,
                      imageUrl: item.img,
                    })
                  }
                >
                  <div className="flex items-center justify-center bg-gray-100 h-32">
                    <img
                      src={item.img}
                      alt={item.title || `Gallery image ${item.id}`}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500">
              No photos found for this collection.
            </div>
          )}
        </section>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
