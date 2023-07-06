import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CommonEntity } from '@models';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { Message } from '@core/message';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const name = 'documentsuborganiztion';

const action = {
  ...new Action<Documentsub>(name),
  getSub: createAsyncThunk(name + '/get', async ({ id }: { id?: string }) => {
    const data = await API.get<Documentsub>(`${routerLinks(name, 'api')}/${id}`);
    return data;
  }),
  getByIdSub: createAsyncThunk(
    name + '/getById',
    async ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<Documentsub> }) => {
      const data = await API.get<Documentsub>(`${routerLinks(name, 'api')}/${id}`);
      return { data, keyState };
    },
  ),
  putSub: createAsyncThunk(name + '/putSub', async ({ id }: Documentsub) => {
    const status = 'SIGNED_CONTRACT';
    const { statusCode, message } = await API.put<Documentsub>(`${routerLinks(name, 'api')}/${id}`, {
      status: 'SIGNED_CONTRACT',
    });
    if (message) Message.success({ text: message });
    return statusCode;
  }),

  uploadSub: createAsyncThunk(name + '/uploadSub', async (values: any) => {
    const { statusCode, message } = await API.responsible<any>(
      '/file-doc-contract',
      {},
      {
        ...API.init(),
        method: 'post',
        body: values,
        headers: {
          authorization: 'Bearer ' + (localStorage.getItem('b7a2bdf4-ac40-4012-9635-ff4b7e55eae0') || ''),
          'Accept-Language': localStorage.getItem('i18nextLng') || '',
        },
      },
    );
    if (message) Message.success({ text: message });
    return statusCode;
  }),

  deleteSub: createAsyncThunk(name + '/deleteSub', async ({ id }: Documentsub) => {
    const { statusCode, message } = await API.delete<Documentsub>(`/file-doc-contract/${id}`);
    if (message) Message.success({ text: message });
    return statusCode;
  }),

  downloadSub: createAsyncThunk(name + '/downloadSub', async ({ url }: Documentsub) => {
    let extension;
    let filename;

    if (url) {
      extension = url.substring(url.lastIndexOf('.') + 1);
    } else {
    }

    switch (extension) {
      case 'png':
        filename = 'File hợp đồng.png';
        break;
      case 'pdf':
        filename = 'File hợp đồng.pdf';
        break;
      case 'docx':
        filename = 'File hợp đồng.docx';
        break;
      case 'jpg':
        filename = 'File hợp đồng.jpg';
        break;
      case 'csv':
        filename = 'File hợp đồng.csv';
        break;
      case 'xlsx':
        filename = 'File hợp đồng.xlsx';
        break;
      case 'xls':
        filename = 'File hợp đồng.xls';
        break;
      default:
        filename = 'File hợp đồng';
    }

    saveAs(url as string, filename);
  }),

  downloadSubZip: createAsyncThunk(name + '/downloadSub', async ({ urls }: { urls: string[] }) => {
    const zip = new JSZip();

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const extension = url.substring(url.lastIndexOf('.') + 1);
      const uniqueFilename = `File hợp đồng_${Date.now()}.${extension}`;

      const response = await fetch(url);
      const blob = await response.blob();

      zip.file(uniqueFilename, blob);
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'Tệp hợp đồng.zip');
    });
  }),
};

export const documentsubSlice = createSlice(
  new Slice<Documentsub>(action, { result: {} }, (builder) =>
    builder
      .addCase(
        action.putSub.pending,
        (
          state: State<Documentsub>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'putSub.pending';
        },
      )

      .addCase(action.putSub.fulfilled, (state: State<Documentsub>, action: any) => {
        if (action.payload) {
          state.result = action.payload;
          state.status = 'putSub.fulfilled';
          console.log(state.status);
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.putSub.rejected, (state: State) => {
        state.status = 'putSub.rejected';
        state.isLoading = false;
      })

      .addCase(
        action.uploadSub.pending,
        (
          state: State<Documentsub>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'uploadSub.pending';
        },
      )

      .addCase(action.uploadSub.fulfilled, (state: State<Documentsub>, action: any) => {
        if (action.payload) {
          state.result = action.payload;
          state.status = 'uploadSub.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.uploadSub.rejected, (state: State) => {
        state.status = 'uploadSub.rejected';
        state.isLoading = false;
      })
      .addCase(
        action.deleteSub.pending,
        (
          state: State<Documentsub>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'deleteSub.pending';
        },
      )

      .addCase(action.deleteSub.fulfilled, (state: State<Documentsub>, action: any) => {
        if (action.payload) {
          state.result = action.payload;
          state.status = 'deleteSub.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.deleteSub.rejected, (state: State) => {
        state.status = 'deleteSub.rejected';
        state.isLoading = false;
      }),
  ),
);

export const DocumentsubFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Documentsub>),
    set: (values: State<Documentsub>) => dispatch(action.set(values)),
    get: ({ id }: { id?: string }) => dispatch(action.getSub({ id })),
    putSub: (values: Documentsub) => dispatch(action.putSub(values)),
    uploadSub: (values: FormData) => dispatch(action.uploadSub(values)),
    deleteSub: (id: Documentsub) => dispatch(action.deleteSub(id)),
    downloadSub: (id: Documentsub) => dispatch(action.downloadSub(id)),
    downloadSubZip: ({ urls }: { urls: string[] }) => dispatch(action.downloadSubZip({ urls })),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Documentsub> }) =>
      dispatch(action.getByIdSub({ id, keyState })),
  };
};

export class Documentsub extends CommonEntity {
  constructor(
    public id?: string,
    public name?: string,
    public code?: string,
    public subOrgId?: string,
    public docSubOrgId?: string,
    public files?: string,
    public url?: string,
    public urls?: string,
    public filePhoto?: string,
    public totalCommissionSupplier?: number,
  ) {
    super();
  }
}
