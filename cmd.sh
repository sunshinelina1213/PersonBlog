#!/bin/bash
NODE=`which node`
PID_FILE="./run.pid"
LOG_NAME="./run.log"
PATH=`/bin/pwd`
INDEX="$PATH/server/app.js"

ACTION=$1

RUN_PORT=$2
if [ "$RUN_PORT" = "" ]; then
  RUN_PORT="8999"
fi

#befor action
export NODE_ENV="production"
export IP="0.0.0.0"
export PORT="$RUN_PORT"

#echo $INDEX
start(){
if [ -f $PID_FILE ];then
   echo " process is  already staring! "
else
  echo "node start ======"
  $NODE $INDEX >> $LOG_NAME 2>&1 &  #将调试信息写入文件，并以后台的方式运行
  if [ $? -eq 0 ];then
   echo $! > $PID_FILE #将当前进程写入pid文件
    echo "$IP:$PORT"
    echo "node start successfully!"
  else
    echo "node start failed!"
  fi
fi
}

stop(){
if [ ! -f $PID_FILE ];then
  echo "node is not start yet!"
else
  echo "node stop ======"
  /bin/kill `/bin/cat $PID_FILE`
  /bin/rm -rf $PID_FILE
  if [ $? -eq 0 ];then
    echo "node stopped successfully!"
  else
    echo "node stopped failed!"
  fi
fi
}

change(){
  BRANCH=$1
  BRANCH=(${BRANCH//-/ })
  BID=${BRANCH[0]}
  if [ "$BID" -gt 0 ] 2>/dev/null ; then
    BID=$[BID+9000]
    echo $BID
  else
    echo 9000
  fi
}

case $ACTION in
start)
        start
;;
stop)
        stop
;;
reload)
        stop
        /bin/sleep 3
        start
;;
change)
        change $2
;;
*)
    echo "$0 Usage: [start|stop|reload|change]"
;;
esac