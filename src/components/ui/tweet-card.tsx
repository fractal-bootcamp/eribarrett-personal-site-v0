// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Heart, MessageCircle, Repeat, Share } from "lucide-react";

// interface TweetCardProps {
//     username: string;
//     handle: string;
//     profileImage: string;
//     content: string;
//     date: string;
//     likes?: number;
//     retweets?: number;
//     replies?: number;
//     media?: string;
// }

// export function TweetCard({
//     username,
//     handle,
//     profileImage,
//     content,
//     date,
//     likes = 0,
//     retweets = 0,
//     replies = 0,
//     media
// }: TweetCardProps) {
//     const [liked, setLiked] = useState(false);
//     const [retweeted, setRetweeted] = useState(false);
//     const [likeCount, setLikeCount] = useState(likes);
//     const [retweetCount, setRetweetCount] = useState(retweets);

//     const handleLike = () => {
//         if (liked) {
//             setLikeCount(likeCount - 1);
//         } else {
//             setLikeCount(likeCount + 1);
//         }
//         setLiked(!liked);
//     };

//     const handleRetweet = () => {
//         if (retweeted) {
//             setRetweetCount(retweetCount - 1);
//         } else {
//             setRetweetCount(retweetCount + 1);
//         }
//         setRetweeted(!retweeted);
//     };

//     return (
//         <div className="bg-black bg-opacity-40 dark:bg-black dark:bg-opacity-70 rounded-xl p-4 max-w-md border border-gray-800 shadow-lg">
//             <div className="flex items-start space-x-3">
//                 <div className="flex-shrink-0">
//                     <Image
//                         src={profileImage}
//                         alt={username}
//                         width={48}
//                         height={48}
//                         className="rounded-full"
//                     />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-white font-bold">{username}</p>
//                             <p className="text-gray-400 text-sm">@{handle}</p>
//                         </div>
//                         <div>
//                             <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 text-gray-400 fill-current">
//                                 <g>
//                                     <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
//                                 </g>
//                             </svg>
//                         </div>
//                     </div>
//                     <p className="mt-2 text-white whitespace-pre-wrap">{content}</p>
//                     {media && (
//                         <div className="mt-3 rounded-xl overflow-hidden">
//                             <Image
//                                 src={media}
//                                 alt="Tweet media"
//                                 width={400}
//                                 height={300}
//                                 className="w-full object-cover"
//                             />
//                         </div>
//                     )}
//                     <p className="mt-2 text-gray-400 text-sm">{date}</p>
//                     <div className="mt-3 flex justify-between text-gray-400">
//                         <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
//                             <MessageCircle className="w-4 h-4" />
//                             <span className="text-xs">{replies}</span>
//                         </button>
//                         <button
//                             className={`flex items-center space-x-1 hover:text-green-400 transition-colors ${retweeted ? 'text-green-400' : ''}`}
//                             onClick={handleRetweet}
//                         >
//                             <Repeat className="w-4 h-4" />
//                             <span className="text-xs">{retweetCount}</span>
//                         </button>
//                         <button
//                             className={`flex items-center space-x-1 hover:text-pink-400 transition-colors ${liked ? 'text-pink-400' : ''}`}
//                             onClick={handleLike}
//                         >
//                             <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
//                             <span className="text-xs">{likeCount}</span>
//                         </button>
//                         <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
//                             <Share className="w-4 h-4" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// } 