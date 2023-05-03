import { useEffect, useState } from 'react'

import { Button, FormControlLabel, Paper, Radio, RadioGroup } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useActions } from '../../common/utils/hooks/useActions'
import { CardType } from '../cards/cardsApi/cardsApi'

import { getCardFunction } from './getCardFunction/getCardFunction'
import { selectorCards, selectorNameCard } from './learn-selectors'
import { learnThunks } from './LearnSlice'
import s from './styles/LearnList.module.css'

const rate = [
  'Я не знал',
  'Забыл',
  'Предположение',
  'Когда-то знал, но сейчас уже забыл',
  'Я знал!',
]

type FormDataType = {
  selectRate: string
}

export const LearnList = () => {
  const params = useParams<{ id: string }>()
  const cards = useSelector(selectorCards)
  const packName = useSelector(selectorNameCard)
  const [card, setCard] = useState<CardType>()
  const [showAnswer, setShowAnswer] = useState(false)
  const { updateCardForLearn, fetchCardsForLearn } = useActions(learnThunks)
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
    updateCardForLearn({
      _id: card?._id ? card?._id : null,
      grade: +data.selectRate,
    })
    reset()
  }

  useEffect(() => {
    fetchCardsForLearn({ cardsPack_id: params.id }).then(res => {
      if (res.payload) {
        setCard(getCardFunction(res.payload.cards))
      }
    })
  }, [])

  return (
    <div className={s.wrapper}>
      <h2>PackName: {packName}</h2>
      <Paper elevation={6} className={!showAnswer ? s.paper : s.paper + ' ' + s.paperQ}>
        <div className={s.question}>
          <b>Question: </b> {card?.question}
        </div>
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
            <div className={s.answer}>
              <b>Answer: </b> {card?.answer}
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.grades}>
                  <Controller
                    control={control}
                    name="selectRate"
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        {rate.map((el, id) => (
                          <FormControlLabel
                            key={id}
                            value={id + 1}
                            control={<Radio />}
                            label={el}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  />
                </div>
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
