
import React, { useEffect, useRef } from 'react'
import { getStyle } from '@coreui/utils'
import { CChart } from '@coreui/react-chartjs'

const UsersStatistic = () => {  

  const chartRef = useRef(null)

  useEffect(() => {
    const handleColorSchemeChange = () => {
      const chartInstance = chartRef.current
      if (chartInstance) {
        const { options } = chartInstance

        if (options.plugins?.legend?.labels) {
          options.plugins.legend.labels.color = getStyle('--cui-body-color')
        }

        if (options.scales?.x) {
          if (options.scales.x.grid) {
            options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          }
          if (options.scales.x.ticks) {
            options.scales.x.ticks.color = getStyle('--cui-body-color')
          }
        }

        if (options.scales?.y) {
          if (options.scales.y.grid) {
            options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          }
          if (options.scales.y.ticks) {
            options.scales.y.ticks.color = getStyle('--cui-body-color')
          }
        }

        chartInstance.update()
      }
    }

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)

    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
    }
  }, [])

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'], // 9 labels
    datasets: [
      {
        label: 'Users In 2024',
        backgroundColor: '#887979',
        borderColor: '#f87979',
        data: [105, 20, 55, 39, 10, 33, 39, 40, 60],
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
        type: 'category',
      },
      y: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
        beginAtZero: true,
      },
    },
  }

  return <CChart type="bar" data={data} options={options} ref={chartRef} />
}

export default UsersStatistic
