import {
  CommunicationKingFillIcon,
  CommunicationKingIcon,
  EmpathizingFillIcon,
  EmpathizingIcon,
  FirstCommentFillIcon,
  FirstCommentIcon,
  GetChallengeFillIcon,
  GetChallengeIcon,
  GrowingTogetherFillIcon,
  GrowingTogetherIcon,
  NaturalBornO2FillIcon,
  NaturalBornO2Icon,
  Percent100Icon,
  Percent20Icon,
  Percent40Icon,
  Percent60Icon,
  Percent80Icon,
  ReadyForCommunicationFillIcon,
  ReadyForCommunicationIcon,
  ReadyForGrowFillIcon,
  ReadyForGrowIcon,
  ShyEmailFillIcon,
  ShyEmailIcon,
  SympathyKingFillIcon,
  SympathyKingIcon,
  UsefulLearnMyselfFillIcon,
  UsefulLearnMyselfIcon,
  UsefulShareTogetherFillIcon,
  UsefulShareTogetherIcon,
  WelcomeToO2FillIcon,
  WelcomeToO2Icon,
} from 'assets/images';
import { ReactComponent as LeftArrow } from 'assets/images/largeLeftArrow.svg';
import { ReactComponent as RightArrow } from 'assets/images/largeRightArrow.svg';
import { DotText, Img, Link, MyPageCard } from 'components/atoms';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'stores/user';
import { IMyPageConcert, IMyPageHeader } from 'types/myPage.type';
import {
  CouponBookWrapper,
  GradientLeft,
  GradientRight,
  NextButton,
  PrevButton,
  Slider,
  SliderBox,
  SliderCoupon,
  SliderLearnMySelf,
  SliderLearnMySelfImg,
  SliderNoContent,
  SliderShareTogether,
  TextLabel,
  Wrapper,
} from './style';

export interface IProps {
  userInfo: IMyPageHeader | null;
}

function MyPageSlider({ userInfo }: IProps): React.ReactElement {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [localVisible, setLocalVisible] = useState(!currentSlide);
  const globalUserInfo = useRecoilValue(userState);
  const slideRef = useRef<HTMLInputElement>(null);

  const nextSlide = (): void => {
    if (currentSlide <= 0) {
      setCurrentSlide(currentSlide + 426);
    }
  };

  const prevSlide = (): void => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 426);
    }
  };

  useEffect(() => {
    if (slideRef?.current) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${currentSlide}px)`;
    }
  }, [currentSlide]);

  useEffect(() => {
    if ((localVisible && currentSlide) || (localVisible && !currentSlide)) {
      setAnimation(true);
      setTimeout(() => setAnimation(false), 500);
    }

    setLocalVisible(!currentSlide);
  }, [localVisible, currentSlide]);

  const getLevelIcon = (percent: number): string => {
    if (percent <= 20) return Percent20Icon;
    else if (percent <= 50) return Percent40Icon;
    else if (percent <= 80) return Percent60Icon;
    else if (percent <= 99) return Percent80Icon;
    else return Percent100Icon;
  };

  return (
    <Wrapper>
      <PrevButton onClick={prevSlide}>
        <LeftArrow stroke="#fff" />
      </PrevButton>
      <Slider>
        <SliderBox ref={slideRef}>
          <MyPageCard title="Learn Myself" width="350">
            {userInfo?.learnMyselfAchieve ? (
              <Link to={`challenge/${userInfo.learnMyselfAchieve.generation}`}>
                <SliderLearnMySelf>
                  <h1>
                    {`${dayjs(userInfo.learnMyselfAchieve.startDT).format('YY.MM.DD')} - ${dayjs(
                      userInfo.learnMyselfAchieve.endDT,
                    ).format('YY.MM.DD')}`}
                  </h1>
                  <SliderLearnMySelfImg>
                    <Img src={getLevelIcon(userInfo.learnMyselfAchieve.percent)} />
                  </SliderLearnMySelfImg>
                  <h2>{userInfo.learnMyselfAchieve.percent}% ??????</h2>
                  <h3>
                    ?????? ??? ?????? &nbsp; &nbsp;<span>{userInfo.learnMyselfAchieve.completeNum}</span> &nbsp;/ &nbsp;
                    {userInfo.learnMyselfAchieve.totalNum}
                  </h3>
                </SliderLearnMySelf>
              </Link>
            ) : (
              <SliderNoContent>
                <p>?????? ????????? ???????????? ?????????!</p>
              </SliderNoContent>
            )}
          </MyPageCard>
          <MyPageCard title="Share Together" width="310">
            {userInfo?.shareTogether ? (
              <SliderShareTogether>
                <h4>
                  {globalUserInfo?.nickname}?????? ?????????
                  <br /> ????????? ??????????????????!
                </h4>
                {userInfo?.shareTogether.map((item: IMyPageConcert) => (
                  <DotText key={item._id} content={item.title} />
                ))}
              </SliderShareTogether>
            ) : (
              <SliderNoContent>
                <p>?????? ????????? ????????? ?????????!</p>
              </SliderNoContent>
            )}
          </MyPageCard>
          <MyPageCard title="Coupon Book" width="550">
            <CouponBookWrapper>
              <SliderCoupon>
                <Img src={userInfo?.couponBook.welcomeBadge ? WelcomeToO2FillIcon : WelcomeToO2Icon} />
                <TextLabel>?????? ??? ??????</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img src={userInfo?.couponBook.firstJoinBadge ? ReadyForGrowFillIcon : ReadyForGrowIcon} />
                <TextLabel>?????? ?????? ??????</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img src={userInfo?.couponBook.firstWriteBadge ? GrowingTogetherFillIcon : GrowingTogetherIcon} />
                <TextLabel>?????? ?????? ???</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img
                  src={userInfo?.couponBook.oneCommentBadge ? ReadyForCommunicationFillIcon : ReadyForCommunicationIcon}
                />
                <TextLabel>?????? ?????? ??????</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img src={userInfo?.couponBook.challengeBadge === 1 ? GetChallengeFillIcon : GetChallengeIcon} />
                <TextLabel>1??? ????????? ??????</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img src={userInfo?.couponBook.fiveCommentBadge ? CommunicationKingFillIcon : CommunicationKingIcon} />
                <TextLabel>????????? ?????????</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img src={userInfo?.couponBook.oneLikeBadge ? EmpathizingFillIcon : EmpathizingIcon} />
                <TextLabel>????????? ?????????</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img src={userInfo?.couponBook.fiveLikeBadge ? SympathyKingFillIcon : SympathyKingIcon} />
                <TextLabel>????????? ?????????</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img src={userInfo?.couponBook.loginBadge ? NaturalBornO2FillIcon : NaturalBornO2Icon} />
                <TextLabel>???????????? ?????????</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img src={userInfo?.couponBook.challengeBadge === 2 ? GetChallengeFillIcon : GetChallengeIcon} />
                <TextLabel>2??? ????????? ??????</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img src={userInfo?.couponBook.marketingBadge ? ShyEmailFillIcon : ShyEmailIcon} />
                <TextLabel>????????? ?????????</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img src={userInfo?.couponBook.learnMySelfBadge ? UsefulLearnMyselfFillIcon : UsefulLearnMyselfIcon} />
                <TextLabel>????????? ?????????</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img
                  src={userInfo?.couponBook.concertScrapBadge ? UsefulShareTogetherFillIcon : UsefulShareTogetherIcon}
                />
                <TextLabel>????????? ??????</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img src={userInfo?.couponBook.firstReplyBadge ? FirstCommentFillIcon : FirstCommentIcon} />
                <TextLabel>????????? ??? ??????</TextLabel>
              </SliderCoupon>
              <SliderCoupon>
                <Img src={userInfo?.couponBook.challengeBadge === 3 ? GetChallengeFillIcon : GetChallengeIcon} />
                <TextLabel>3??? ????????? ??????</TextLabel>
              </SliderCoupon>
            </CouponBookWrapper>
          </MyPageCard>
        </SliderBox>
      </Slider>
      {(!localVisible || animation) && <GradientLeft disappear={!!currentSlide}></GradientLeft>}
      {(localVisible || animation) && <GradientRight disappear={!!currentSlide}></GradientRight>}
      <NextButton onClick={nextSlide}>
        <RightArrow stroke="#fff" />
      </NextButton>
    </Wrapper>
  );
}

export default MyPageSlider;
