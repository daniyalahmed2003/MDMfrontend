// import { useSelector } from "react-redux";

// const FavoritesCount = () => {
//   const favorites = useSelector((state) => state.favorites);
//   const favoriteCount = favorites.length;

//   if (favoriteCount === 0) return null;

//   return (
//     <div className="absolute left-40 top-8">
//       <span
//         className="px-2 py-0.5 text-xs font-semibold text-white bg-pink-500 rounded-full shadow-md"
//         aria-label={`You have ${favoriteCount} favorite products`}
//       >
//         {favoriteCount}
//       </span>
//     </div>
//   );
// };

// export default FavoritesCount;


// import { useSelector } from "react-redux";

// const FavoritesCount = () => {
//   const favorites = useSelector((state) => state.favorites);
//   const favoriteCount = favorites.length;

//   return (
//     <div className="absolute left-2 top-8">
//       {favoriteCount > 0 && (
//         <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
//           {favoriteCount}
//         </span>
//       )}
//     </div>
//   );
// };

// export default FavoritesCount;

// import { useSelector } from "react-redux";

// const FavoritesCount = () => {
//   const favorites = useSelector((state) => state.favorites);
//   const favoriteCount = favorites.length;

//   if (favoriteCount === 0) return null;

//   return (
//     <span className="ml-1 px-2 text-xs font-bold text-white bg-pink-500 rounded-full">
//       {favoriteCount}
//     </span>
//   );
// };

// export default FavoritesCount;


import { useSelector } from "react-redux";
import axios from "axios";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  if (favoriteCount === 0) return null;

  return (
    <span className="absolute -top-[-24px] -left-[-750px] px-2 text-xs font-bold text-white bg-pink-500 rounded-full">
      {favoriteCount}
    </span>
  );
};

export default FavoritesCount;

