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
                <p>{t('supplier.Contract-View.SOCIALIST REPUBLIC OF VIETNAM')}</p>
                <p className="flex justify-center">{t('supplier.Contract-View.Independence-Freedom-Happiness')} </p>
                <p className="flex justify-center">--------------------</p>
                <strong className="flex justify-center mt-4">{t('supplier.Contract-View.Contract')}</strong>
                <strong>
                  <p className="flex justify-center">{t('supplier.Contract.Contract Code')}: HĐ_7-2022_287</p>
                </strong>
              </div>
            </div>
            <div className="">
              <p className="py-3 px-1">{t('supplier.Contract-View.Today')}:</p>
              <table width="100%" cellPadding={5}>
                <tbody>
                  <tr>
                    <td colSpan={3}>
                      <strong>BALANCE ({t('supplier.Contract-View.Referred A')}):</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[33%]">{t('user.Fullname')}: </td>
                    <td className="w-[33%]">{t('user.Phone Number')}:</td>
                    <td className="w-[33%]">Email: </td>
                  </tr>
                  <tr>
                    <td className="w-[33%]">{t('supplier.Contract-View.ID')}: </td>
                    <td className="w-[33%]">{t('supplier.Contract-View.Date Range')}: </td>
                    <td className="w-[33%]">{t('supplier.Contract-View.Issued by')}: </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>{t('supplier.Contract-View.DKTT')}:</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <strong>
                        {t('supplier.Contract-View.SUPPLIER')}({t('supplier.Contract-View.Referred B')}):{' '}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[33%]">{t('user.Fullname')}: </td>
                    <td className="w-[33%]">{t('user.Phone Number')}:</td>
                    <td className="w-[33%]">Email: </td>
                  </tr>
                  <tr>
                    <td className="w-[33%]">{t('supplier.Contract-View.ID')}: </td>
                    <td className="w-[33%]">{t('supplier.Contract-View.Date Range')}: </td>
                    <td className="w-[33%]">{t('supplier.Contract-View.Issued by')}: </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>{t('supplier.Contract-View.DKTT')}:</td>
                  </tr>
                </tbody>
              </table>
              <p className="py-2 px-1">
                <strong>{t('supplier.Contract-View.Contract with code')}:</strong>
              </p>
              <p className="py-2 px-1">{t('supplier.Contract-View.Contract from the date')} .</p>
              <p className="py-2 px-1">{t('supplier.Contract-View.Contract content')}.</p>
              <p className="py-2 px-1">{t('supplier.Contract-View.Contract Minutes')}.</p>
            </div>
            <div className="flex pt-4">
              <div className="p-1 flex justify-center items-center w-1/2">
                <div>
                  <strong className="flex justify-center">{t('supplier.Contract-View.A side')}</strong>
                  <div className="flex justify-center">
                    <button className=" bg-red-200 border p-2 m-0 rounded-lg hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border">
                      {t('supplier.Contract-View.Sign')}
                    </button>
                  </div>
                  <em className="flex justify-center">({t('supplier.Contract-View.Sign')})</em>
                  <p className="flex justify-center">{t('supplier.Contract-View.Contract name')}</p>
                </div>
              </div>
              <div className="p-1 flex justify-center items-center w-1/2">
                <div>
                  <strong className="flex justify-center">{t('supplier.Contract-View.B side')}</strong>
                  <div className="flex justify-center">
                    <button className=" bg-red-200 border p-2 m-0 rounded-lg hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border">
                      {t('supplier.Contract-View.Sign')}
                    </button>
                  </div>
                  <em className="flex justify-center">({t('supplier.Contract-View.Sign')})</em>
                  <p className="flex justify-center">{t('supplier.Contract-View.Contract name')}</p>
                </div>
              </div>
            </div>
            <div className="mt-20 mb-2">
              <div className="flex justify-center">
                <button className=" bg-green-200 p-2 border rounded-lg hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border">
                  In
                </button>
                <button className=" bg-blue-200 p-2 border ml-5 rounded-lg hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border">
                  {t('supplier.Contract-View.Export contract')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:mt-7 mt-2">
          <div className="flex flex-col items-center mt-2" onClick={handBack}>
            <button className="z-10 px-8 w-auto bg-white border-teal-900 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 mt-2 text-sm h-11">
              {t('components.form.modal.cancel')}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Page;
