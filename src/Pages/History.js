import { Text } from "../Components/Text";

const History = () => {
    return (
        <div className="bg-white-A700 flex flex-col gap-8 h-full min-h-screen items-start justify-start pb-8 pt-8 rounded-tl-[40px]  w-full">
            <div className="flex flex-col items-start justify-start sm:px-5 px-8 w-full">
              <div className="border-b border-indigo-50 border-solid flex flex-col md:flex-row gap-5 items-start justify-start pb-6 w-full">
                <div className="flex flex-1 flex-col font-dmsans h-full items-start justify-start w-full">
                  <Text
                    className="text-3xl font-bold leading-11 text-gray-900 w-full"
                    size="txtDmSansBold32"
                  >
                    History
                  </Text>
                </div>
                <div className="flex md:w-[25%] w-full rounded-md p-2 border border-solid">
                  <img
                    className="cursor-pointer h-[18px] mr-1.5 my-px"
                    src="images/img_search_blue_gray_700_01.svg"
                    alt="search"
                  />
                  <input
                    className={`!placeholder:text-blue_gray-300 !text-blue_gray-300 font-manrope p-0 text-left text-sm tracking-[0.14px] w-full bg-transparent border-0`}
                    type="text"
                    name="search"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
        </div>
    )
}

export default History;