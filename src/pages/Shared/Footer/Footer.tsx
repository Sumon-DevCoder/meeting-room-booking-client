import { Link } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo/BrandLogo";

const Footer = () => {
  return (
    // <div>
    //   <div className="bg-gradient-to-r from-sky-900 to-sky-900 dark:from-blue-900 dark:to-green-900 pt-9">
    //     <div className="mx-auto w-full  px-4 md:px-0 ">
    //       <div className="flex flex-col gap-5 lg:gap-0 justify-between sm:px-[18px] md:flex-row lg:px-10">
    //         <div className="md:w-[316px]">
    //           <h1 className="text-white font-extrabold text-[24px]">
    //             <Link
    //               to={`/`}
    //               className="btn btn-ghost text-[19px] md:text-md bg-gradient-to-r from-blue-800 text-slate-200 font-medium"
    //             >
    //               Meeting Room Booking
    //             </Link>
    //           </h1>
    //           <p className="mt-[18px] text-[15px] font-normal text-white/[80%]">
    //             Welcome to Meeting Room Booking, your go-to platform for
    //             effortless meeting room bookings. Discover the perfect space and
    //             enjoy a hassle-free scheduling experience
    //           </p>

    //           <div className="mt-[18px] flex gap-5">
    //             <a
    //               className="hover:scale-110"
    //               target="_blank"
    //               href="https://www.facebook.com/Sumon.DevCoder/"
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="32"
    //                 height="32"
    //                 fill="currentColor"
    //                 className="bi bi-facebook text-white"
    //                 viewBox="0 0 16 16"
    //               >
    //                 <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
    //               </svg>
    //             </a>
    //             <a
    //               className="hover:scale-110"
    //               target="_blank"
    //               href="https://web.whatsapp.com/"
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="32"
    //                 height="32"
    //                 fill="currentColor"
    //                 className="bi bi-whatsapp text-white"
    //                 viewBox="0 0 16 16"
    //               >
    //                 <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    //               </svg>
    //             </a>
    //             <a
    //               className="hover:scale-110"
    //               target="_blank"
    //               href="https://www.instagram.com/"
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="32"
    //                 height="32"
    //                 fill="currentColor"
    //                 className="bi bi-instagram text-white"
    //                 viewBox="0 0 16 16"
    //               >
    //                 <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
    //               </svg>
    //             </a>
    //           </div>
    //         </div>
    //         <div className="md:w-[316px]">
    //           <h3 className="text-white font-medium text-[18px] mt-6 md:mt-0">
    //             Contact Us
    //           </h3>
    //           {/* one */}
    //           <div className="mt-[23px] flex items-center">
    //             <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white">
    //               <svg
    //                 width="20"
    //                 height="20"
    //                 viewBox="0 0 20 20"
    //                 fill="none"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="dark:text-black"
    //               >
    //                 <path
    //                   d="M10 0C4.485 0 0 4.485 0 10s4.485 10 10 10 10-4.485 10-10S15.515 0 10 0zm0 18C5.477 18 2 14.523 2 10S5.477 2 10 2s8 3.477 8 8-3.477 8-8 8z"
    //                   fill="currentColor"
    //                 />
    //                 <path
    //                   d="M9 5.5a4.5 4.5 0 1 1 2 0 4.5 4.5 0 0 1-2 0zM10 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
    //                   fill="currentColor"
    //                 />
    //               </svg>
    //             </div>
    //             <div className="ml-[18px]">
    //               <a
    //                 href="tel:+911800123444"
    //                 className="text-white font-medium"
    //               >
    //                 +8801962-878499
    //               </a>
    //               <p className="text-white text-[12px]">Support Number</p>
    //             </div>
    //           </div>
    //           {/* two */}
    //           <div className="mt-[23px] flex items-center">
    //             <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white">
    //               <svg
    //                 width="20"
    //                 height="20"
    //                 viewBox="0 0 24 24"
    //                 fill="none"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="dark:text-black"
    //               >
    //                 <path
    //                   d="M12 2C10.34 2 8.68 2.63 7.5 3.77C6.31 4.91 5.5 6.5 5.5 8.5C5.5 10.9 8.5 14.5 12 18C15.5 14.5 18.5 10.9 18.5 8.5C18.5 6.5 17.69 4.91 16.5 3.77C15.32 2.63 13.66 2 12 2ZM12 20C11.55 20 11.1 19.95 10.66 19.85C10.76 19.95 10.87 20 11 20H13C13.13 20 13.24 19.95 13.34 19.85C12.9 19.95 12.45 20 12 20Z"
    //                   fill="currentColor"
    //                 />
    //               </svg>
    //             </div>
    //             <div className="ml-[18px]">
    //               <a
    //                 href="tel:+911800123444"
    //                 className="text-white font-medium"
    //               >
    //                 1234 Street Name, City
    //               </a>
    //               <p className="text-white text-[12px]">Address</p>
    //             </div>
    //           </div>

    //           <div className="mt-[23px] flex items-center">
    //             <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white">
    //               <svg
    //                 width="20"
    //                 height="15"
    //                 viewBox="0 0 20 15"
    //                 fill="none"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="dark:text-black"
    //               >
    //                 <path
    //                   d="M19 0H1C0.801088 0 0.610322 0.0790178 0.46967 0.21967C0.329018 0.360322 0.25 0.551088 0.25 0.75V13.5C0.25 13.8978 0.408035 14.2794 0.68934 14.5607C0.970644 14.842 1.35218 15 1.75 15H18.25C18.6478 15 19.0294 14.842 19.3107 14.5607C19.592 14.2794 19.75 13.8978 19.75 13.5V0.75C19.75 0.551088 19.671 0.360322 19.5303 0.21967C19.3897 0.0790178 19.1989 0 19 0ZM10 7.98281L2.92844 1.5H17.0716L10 7.98281ZM7.25406 7.5L1.75 12.5447V2.45531L7.25406 7.5ZM8.36406 8.51719L9.48906 9.55312C9.62743 9.68014 9.80842 9.75062 9.99625 9.75062C10.1841 9.75062 10.3651 9.68014 10.5034 9.55312L11.6284 8.51719L17.0659 13.5H2.92844L8.36406 8.51719ZM12.7459 7.5L18.25 2.45438V12.5456L12.7459 7.5Z"
    //                   fill="currentColor"
    //                 />
    //               </svg>
    //             </div>
    //             <div className="ml-[18px]">
    //               <a
    //                 href="mailto:help@lorem.com"
    //                 className="text-white font-medium"
    //               >
    //                 meeting.room@gmail.com
    //               </a>
    //               <p className="text-white text-[12px]">Support Email</p>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="md:w-[340px]">
    //           <h3 className="text-white font-medium text-[18px] mt-6 md:mt-0">
    //             About Us
    //           </h3>
    //           <p className="mt-[18px] text-[15px] font-normal text-white/[80%]">
    //             At RoomEase, we strive to redefine your meeting experience. Our
    //             mission is to provide seamless booking solutions tailored to
    //             your needs, ensuring that every gathering is productive and
    //             hassle-free.
    //           </p>
    //           <div className="flex gap-4 md:flex-col lg:flex-row">
    //             <Link
    //               to={"/about-us"}
    //               className="text-indigo-200 underline hover:text-indigo-400 md:border-none  border-b-2 border-gray-400 mt-4 inline-block"
    //             >
    //               Privacy Policy
    //             </Link>
    //             <Link
    //               to={"/about-us"}
    //               className="text-indigo-200 underline hover:text-indigo-400 md:border-none border-b-2  border-gray-400 md:mt-0  mt-4 lg:mt-4 inline-block"
    //             >
    //               Terms of Service.
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="border-t border-white/[20%] mt-8 pt-4">
    //         <p className="text-center text-white text-[14px] pb-3">
    //           ©{new Date().getFullYear()} Meeting Booking Room. All Rights
    //           Reserved
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-gradient-to-r dark:from-slate-800 dark:to-slate-700 pt-9 shadow-md">
      <div className="mx-auto w-full  px-4 md:px-0 ">
        <div className="flex flex-col gap-5 lg:gap-0 justify-between sm:px-[18px] md:flex-row lg:px-10">
          <div className="md:w-[316px]">
            <h1 className="text-white font-extrabold text-[24px] -ml-4">
              <BrandLogo />
            </h1>
            <p className="mt-1 text-[15px] font-normal dark:text-white/[80%] text-gray-900">
              Welcome to Meeting Room Booking, your go-to platform for
              effortless meeting room bookings. Discover the perfect space and
              enjoy a hassle-free scheduling experience
            </p>

            <div className="mt-[18px] flex gap-5 dark:text-white/[80%] text-gray-900">
              <a
                className="hover:scale-110 "
                target="_blank"
                href="https://www.facebook.com/Sumon.DevCoder/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-facebook dark:text-white/[80%] text-gray-900"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>
              </a>
              <a
                className="hover:scale-110"
                target="_blank"
                href="https://web.whatsapp.com/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-whatsapp dark:text-white/[80%] text-gray-900"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
              </a>
              <a
                className="hover:scale-110"
                target="_blank"
                href="https://www.instagram.com/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-instagram dark:text-white/[80%] text-gray-900"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                </svg>
              </a>
            </div>
          </div>
          <div className="md:w-[316px]">
            <h3 className="text-black dark:text-white font-medium text-[18px] mt-6 md:mt-0">
              Contact Us
            </h3>
            {/* one */}
            <div className="mt-[23px] flex items-center">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gray-700 dark:bg-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white dark:text-black"
                >
                  <path
                    d="M10 0C4.485 0 0 4.485 0 10s4.485 10 10 10 10-4.485 10-10S15.515 0 10 0zm0 18C5.477 18 2 14.523 2 10S5.477 2 10 2s8 3.477 8 8-3.477 8-8 8z"
                    fill="currentColor"
                  />
                  <path
                    d="M9 5.5a4.5 4.5 0 1 1 2 0 4.5 4.5 0 0 1-2 0zM10 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="ml-[18px]">
                <a
                  href="tel:+911800123444"
                  className="text-black dark:text-white font-medium"
                >
                  +8801962-878499
                </a>
                <p className="text-gray-600 dark:text-gray-300 text-[12px]">
                  Support Number
                </p>
              </div>
            </div>
            {/* two */}
            <div className="mt-[23px] flex items-center">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gray-700 dark:bg-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white dark:text-black"
                >
                  <path
                    d="M12 2C10.34 2 8.68 2.63 7.5 3.77C6.31 4.91 5.5 6.5 5.5 8.5C5.5 10.9 8.5 14.5 12 18C15.5 14.5 18.5 10.9 18.5 8.5C18.5 6.5 17.69 4.91 16.5 3.77C15.32 2.63 13.66 2 12 2ZM12 20C11.55 20 11.1 19.95 10.66 19.85C10.76 19.95 10.87 20 11 20H13C13.13 20 13.24 19.95 13.34 19.85C12.9 19.95 12.45 20 12 20Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="ml-[18px]">
                <a
                  href="tel:+911800123444"
                  className="text-black dark:text-white font-medium"
                >
                  1234 Street Name, City
                </a>
                <p className="text-gray-600 dark:text-gray-300 text-[12px]">
                  Address
                </p>
              </div>
            </div>
            {/* three */}
            <div className="mt-[23px] flex items-center">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gray-700 dark:bg-white">
                <svg
                  width="20"
                  height="15"
                  viewBox="0 0 20 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white dark:text-black"
                >
                  <path
                    d="M19 0H1C0.801088 0 0.610322 0.0790178 0.46967 0.21967C0.329018 0.360322 0.25 0.551088 0.25 0.75V13.5C0.25 13.8978 0.408035 14.2794 0.68934 14.5607C0.970644 14.842 1.35218 15 1.75 15H18.25C18.6478 15 19.0294 14.842 19.3107 14.5607C19.592 14.2794 19.75 13.8978 19.75 13.5V0.75C19.75 0.551088 19.671 0.360322 19.5303 0.21967C19.3897 0.0790178 19.1989 0 19 0ZM10 7.98281L2.92844 1.5H17.0716L10 7.98281ZM7.25406 7.5L1.75 12.5447V2.45531L7.25406 7.5ZM8.36406 8.51719L9.48906 9.55312C9.62743 9.68014 9.80842 9.75062 9.99625 9.75062C10.1841 9.75062 10.3651 9.68014 10.5034 9.55312L11.6284 8.51719L17.0659 13.5H2.92844L8.36406 8.51719ZM12.7459 7.5L18.25 2.45438V12.5456L12.7459 7.5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="ml-[18px]">
                <a
                  href="mailto:help@lorem.com"
                  className="text-black dark:text-white font-medium"
                >
                  meeting.room@gmail.com
                </a>
                <p className="text-gray-600 dark:text-gray-300 text-[12px]">
                  Support Email
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-[340px]">
            <h3 className="text-black dark:text-white font-medium text-[18px] mt-6 md:mt-0">
              About Us
            </h3>
            <p className="mt-[18px] text-[15px] font-normal text-black/[80%] dark:text-white/[80%]">
              At Meeting Room Booking, we strive to redefine your meeting
              experience. Our mission is to provide seamless booking solutions
              tailored to your needs, ensuring that every gathering is
              productive and hassle-free.
            </p>
            <div className="flex gap-4 md:flex-col lg:flex-row">
              <Link
                to={"/about-us"}
                className="text-blue-600  hover:text-blue-900  dark:text-indigo-200 dark:hover:text-indigo-400 md:border-none border-b-2 border-gray-400 mt-4 inline-block"
              >
                Privacy Policy
              </Link>
              <Link
                to={"/about-us"}
                className="text-blue-600  hover:text-blue-800 dark:text-indigo-200 dark:hover:text-indigo-400 md:border-none border-b-2 border-gray-400 md:mt-0 mt-4 lg:mt-4 inline-block"
              >
                Terms of Service
              </Link>
              <Link
                to={"/about-us"}
                className="text-blue-600  hover:text-blue-800 dark:text-indigo-200 dark:hover:text-indigo-400 md:border-none border-b-2 border-gray-400 md:mt-0 mt-4 lg:mt-4 inline-block"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 dark:border-white/[20%] mt-8 pt-4">
          <p className="text-center text-gray-800 dark:text-white text-[14px] pb-3">
            ©{new Date().getFullYear()} Meeting Booking Room. All Rights
            Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
