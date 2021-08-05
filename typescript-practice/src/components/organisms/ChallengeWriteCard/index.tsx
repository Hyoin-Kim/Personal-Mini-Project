import { writeForm } from 'apis';
import ChallengeWriteButton from 'components/molecules/ChallengeWriteButton';
import ChallengeWriteForm from 'components/molecules/ChallengeWriteForm';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userStatusState } from 'stores/user';
import ChallengeProgressBar from '../../molecules/ChallengeProgressBar';
import ChallengeWriteInterest from '../../molecules/ChallengeWriteInterest';
import { Header } from './style';

type MyFormProps = {
  onChangeForm: (form: { description1: string; description2: string; description3: string }) => void;
};

function WriteCard({ onChangeForm }: MyFormProps): React.ReactElement {
  const history = useHistory();
  const userStatusData = useRecoilValue(userStatusState);
  const [countProgressBar, setCountProgressBar] = useState(0); //프로그래스바
  const maxByte = 1000; //최대 1000바이트

  const [byte, setByte] = useState({
    byte1: 0,
    byte2: 0,
    byte3: 0,
  });

  const [textForm, setTextForm] = useState({
    description1: '',
    description2: '',
    description3: '',
  });

  const { description1, description2, description3 } = textForm;

  const textOnChange = (target: any) => {
    const { name, value } = target;
    setTextForm({
      ...textForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    setUserData({ ...userData, interest: selectedInterest });
    e.preventDefault();
    onChangeForm(textForm);
    setTextForm({
      description1: '',
      description2: '',
      description3: '',
    });
    const writeData = {
      good: description1,
      bad: description2,
      learn: description3,
      interest: selectedInterest,
    };
    if (userStatusData) {
      await writeForm(writeData, userStatusData.token);
      history.goBack();
    }
  };

  const progressBarState = useCallback(() => {
    let count = 0;
    if (byte.byte1 > 0) {
      count++;
    }
    if (byte.byte2 > 0) {
      count++;
    }
    if (byte.byte3 > 0) {
      count++;
    }
    setCountProgressBar(count);
  }, [byte.byte1, byte.byte2, byte.byte3]);

  const totalOnChange = (e: any) => {
    const text_val = e.target.value; //입력한 문자
    const target_byte_name = 'byte' + e.target.name.split('description')[1];
    let str = '';
    let totalByte = 0;
    for (let i = 0; i < text_val.length; i++) {
      totalByte += 1;
    }

    if (totalByte >= maxByte) {
      str = text_val.substring(0, maxByte);
      e.target.value = str;
      totalByte = maxByte;
    }

    textOnChange(e.target);
    setByte({
      ...byte,
      [target_byte_name]: totalByte,
    });
  };

  useEffect(() => {
    progressBarState();
  }, [byte, progressBarState]);

  const [userData, setUserData] = useState({
    interest: [''],
  });

  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);
  const modalInterestHandler = (interest: string) => {
    if (selectedInterest.length === 0) {
      setSelectedInterest([interest]);
    }
    if (selectedInterest.length < 3) {
      if (!selectedInterest.includes(interest)) {
        setSelectedInterest([...selectedInterest, interest]);
      } else {
        setSelectedInterest(selectedInterest.filter((v) => v !== interest));
      }
    } else {
      if (selectedInterest.includes(interest)) {
        setSelectedInterest(selectedInterest.filter((v) => v !== interest));
      }
    }
  };

  const indextoName = (index: undefined | number) => {
    switch (index) {
      case 1:
        return '1st';
      case 2:
        return `2nd`;
      case 3:
        return `3rd`;
      default:
        return `${index}th`;
    }
  };

  return (
    <>
      <Header>Learn Myself {indextoName(userStatusData?.progressGeneration)}</Header>
      <ChallengeProgressBar countProgressBar={countProgressBar} />
      <ChallengeWriteForm totalOnChange={totalOnChange} byte={byte} ITextForm={textForm} />
      <ChallengeWriteInterest
        modalInterestHandler={modalInterestHandler}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
      />
      <ChallengeWriteButton countProgressBar={countProgressBar} handleSubmit={handleSubmit} />
    </>
  );
}

export default WriteCard;
