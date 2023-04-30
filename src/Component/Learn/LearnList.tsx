import { useEffect, useState } from 'react'

import { Button, FormControlLabel, Paper, Radio, RadioGroup } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../../app/store'
import { selectorCardsPack_id } from '../cards/cards-selector'
import { CardType } from '../cards/cardsApi/cardsApi'

import { getCardFunction } from './getCardFunction'
import { selectorCards } from './learn-selectors'
import s from './LearnList.module.css'
import { learnThunks } from './LearnSlice'

const rate = ['Did not knot', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

type FormDataType = {
  selectRate: string
}

export const LearnList = () => {
  const cardsPack_id = useSelector(selectorCardsPack_id)
  const cards = useSelector(selectorCards)
  const [card, setCard] = useState<CardType>()
  const [showAnswer, setShowAnswer] = useState(false)
  const dispatch = useAppDispatch()
  const { handleSubmit, control, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      selectRate: '',
    },
  })

  const onClickAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  const onSubmit = (data: FormDataType) => {
    setCard(getCardFunction(cards.cards))
    setShowAnswer(!showAnswer)
    dispatch(learnThunks.updateCardForLearn({ _id: card?._id, grade: +data.selectRate }))
    reset()
  }

  useEffect(() => {
    dispatch(learnThunks.fetchCardsForLearn({ cardsPack_id })).then(res => {
      if (res.payload) {
        setCard(getCardFunction(res.payload.cards))
      }
    })
  }, [])

  return (
    <div className={s.wrapper}>
      PackName:
      <Paper elevation={6} className={!showAnswer ? s.paper : s.paper + ' ' + s.paperQ}>
        <div className={s.question}>Question: {card?.question}</div>
        <div className={s.shots}>Количество попыток ответов на вопрос: {card?.shots}</div>
        {!showAnswer ? (
          <div>
            <div className={s.button}>
              <Button onClick={onClickAnswer} variant="contained" className={s.btn}>
                Show answer
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className={s.answer}>Answer: {card?.answer}</div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  name="selectRate"
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      {rate.map((el, id) => (
                        <FormControlLabel key={id} value={id + 1} control={<Radio />} label={el} />
                      ))}
                    </RadioGroup>
                  )}
                />
                <div className={s.buttons}>
                  <Button type={'submit'} variant="contained" className={s.btn}>
                    NEXT
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Paper>
    </div>
  )
}
