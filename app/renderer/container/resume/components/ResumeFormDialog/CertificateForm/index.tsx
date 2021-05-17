/**
 * @description 荣誉证书Form
 * 基于 MyDialog 二次封装，结合 MyMaskHoc 加一蒙层
 * 由于弹窗更多注重信息的的输入，所以就不需要通过 useClickAway 实现点击蒙层之外的地方关闭
 * 因为用户无心的误操作将弹窗关闭，就会使得交互上体验不佳
 */
import React from 'react';
import './index.less';
import { Dialog } from '@components/MyModal';
import MyMaskHoc from '@common/hoc/MyMaskHoc';
import MyInput from '@components/MyInput';
import { useSelector } from 'react-redux';
import useUpdateResumeHook from '@src/container/resume/components/ResumeFormDialog/useUpdateResumeHook';

interface IProps {
  onCancel?: () => {};
  onSubmit?: () => {};
}
function CertificateForm(props: IProps | any) {
  const updateResumeHook = useUpdateResumeHook();
  const userResume: TSResume.IntactResume = useSelector((state: any) => state.resumeModel.userResume);
  return (
    <Dialog
      title="个人评价"
      showFooter={false}
      config={{
        cancelBtn: {
          callback: () => {
            props?.onCancel && props.onCancel();
          },
        },
      }}
    >
      <div styleName="form">
        <div styleName="flex">
          <div styleName="left">
            <span styleName="require">*</span>证 书 ：
          </div>
          <div styleName="right">
            <MyInput
              type="textarea"
              onChange={(e) => {
                updateResumeHook<string>('certificate', e.target.value);
              }}
              rows={5}
              value={userResume?.certificate || ''}
              placeholder="互联网+大赛一等奖｜掘金大学骰王｜互联网喝酒大赛进步奖"
              allowClear={true}
            />
            <div styleName="tips"> * 多个证书以 | 分割</div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
export default MyMaskHoc(CertificateForm)({ position: 'center' });
