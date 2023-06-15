import { Fragment } from 'react';
import { t } from 'i18next';

const Page = () => {
  const handBack = () => window.history.back();
  return (
    <Fragment>
      <div>
        <div className="bg-white rounded-xl">
          <div className="p-4">
            <div className="flex justify-center w-full pt-5">
              <div>
                <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM </p>
                <p className="flex justify-center">Độc lập - Tự do - Hạnh phúc </p>
                <p className="flex justify-center">--------------------</p>
                <strong className="flex justify-center mt-4">HỢP ĐỒNG</strong>
                <strong>
                  <p className="flex justify-center">Mã hợp đồng: HĐ_7-2022_287</p>
                </strong>
              </div>
            </div>
            <div className="">
              <p className="py-3 px-1">Hôm nay ngày 05-07-2022 tại ...... Chúng tôi gồm:</p>
              <table width="100%" cellPadding={5}>
                <tbody>
                  <tr>
                    <td colSpan={3}>
                      <strong>BALANCE (Gọi tắt là bên A):</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[33%]">Họ và tên: </td>
                    <td className="w-[33%]">Số điện thoại:</td>
                    <td className="w-[33%]">Email: </td>
                  </tr>
                  <tr>
                    <td className="w-[33%]">Số CMND/CCCD/Passport: </td>
                    <td className="w-[33%]">Ngày cấp: </td>
                    <td className="w-[33%]">Nơi cấp: </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>Nơi ĐKTT:</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <strong>NHÀ CUNG CẤP (Gọi tắt là bên B): </strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[33%]">Họ và tên:</td>
                    <td className="w-[33%]">Số điện thoại: </td>
                    <td className="w-[33%]">Email: </td>
                  </tr>
                  <tr>
                    <td className="w-[33%]">Số CMND/CCCD/Passport: </td>
                    <td className="w-[33%]">Ngày cấp:</td>
                    <td className="w-[33%]">Nơi cấp: </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>Nơi ĐKTT:</td>
                  </tr>
                </tbody>
              </table>
              <p className="py-2 px-1">
                <strong>Căn cứ vào hợp đồng có mã :</strong>
              </p>
              <p className="py-2 px-1">Hai bên đồng ý ký kết hợp đồng từ ngày .</p>
              <p className="py-2 px-1">Chúng tôi đã đọc và hiểu rõ nội dung hợp đồng và đồng ý ký tên.</p>
              <p className="py-2 px-1">Biên bản hợp đồng này sau khi ký tên sẽ có giá trị theo luật định.</p>
            </div>
            <div className="flex pt-4">
              <div className="p-1 flex justify-center items-center w-1/2">
                <div>
                  <strong className="flex justify-center">Bên A</strong>
                  <div className="flex justify-center">
                    <button className=" bg-red-200 border p-2 m-0 rounded-lg hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border">
                      Ký tên
                    </button>
                  </div>
                  <em className="flex justify-center">(Ký tên)</em>
                  <p className="flex justify-center">Hợp đồng được ký bởi tên chủ cung cấp ngày 1/7/2022</p>
                </div>
              </div>
              <div className="p-1 flex justify-center items-center w-1/2">
                <div>
                  <strong className="flex justify-center">Bên B</strong>
                  <div className="flex justify-center">
                    <button className=" bg-red-200 border p-2 m-0 rounded-lg hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border">
                      Ký tên
                    </button>
                  </div>
                  <em className="flex justify-center">(Ký tên)</em>
                  <p className="flex justify-center">Hợp đồng được ký bởi tên chủ cung cấp ngày 1/7/2022</p>
                </div>
              </div>
            </div>
            <div className="mt-20 mb-2">
              <div className="flex justify-center">
                <button className=" bg-green-200 p-2 border rounded-lg hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border">
                  In
                </button>
                <button className=" bg-blue-200 p-2 border ml-5 rounded-lg hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border">
                  Xuất hợp đồng
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:flex sm:mt-7 mt-2">
          <div className="flex flex-col items-center mt-2" onClick={handBack}>
            <button className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 mt-2 text-sm h-11">
              {t('components.form.modal.cancel')}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Page;
