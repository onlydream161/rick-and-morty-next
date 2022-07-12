import { PrimitiveAtom, useAtom } from 'jotai'

export const useModalState = (modalAtom: PrimitiveAtom<boolean>) => {
  const [condition, setCondition] = useAtom(modalAtom)

  const onOpen = () => setCondition(true)

  const onClose = () => setCondition(false)

  const onToggle = () => setCondition(prev => !prev)

  return { isOpen: condition, onOpen, onClose, onToggle }
}
